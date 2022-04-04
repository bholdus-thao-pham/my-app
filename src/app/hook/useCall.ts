import type { PromiseRpcResult } from '@polkadot/api/types';
import type { AnyFunction, Codec } from '@polkadot/types/types';
import { useEffect, useRef, useState } from 'react';
import { MountedRef, useIsMountedRef } from './useIsMountedRef';

import { isNull, isUndefined } from '@polkadot/util';
type TrackFn = PromiseRpcResult<AnyFunction>;

type VoidFn = () => void;

export interface Tracker {
  isActive: boolean;
  serialized: string | null;
  subscriber: Promise<unknown> | null;
}

export interface CallOptions<T> {
  defaultValue?: T;
  paramMap?: (params: any) => any | any[];
  transform?: (value: any) => T;
  withParams?: boolean;
  withParamsTransform?: boolean;
}

interface TrackerRef {
  current: Tracker;
}

export function unsubscribe(tracker: TrackerRef): void {
  tracker.current.isActive = false;

  if (tracker.current.subscriber) {
    tracker.current.subscriber
      .then(unsubFn => (unsubFn as VoidFn)())
      .catch(console.error);
    tracker.current.subscriber = null;
  }
}

function extractParams<T>(
  fn: unknown,
  params: unknown[],
  { paramMap = transformIdentity }: CallOptions<T> = {},
): [string, any | null] {
  return [
    JSON.stringify({ f: (fn as { name: string })?.name, p: params }),
    params.length === 0 ||
    !params.some(param => isNull(param) || isUndefined(param))
      ? paramMap(params)
      : null,
  ];
}

export function transformIdentity<T>(value: unknown): T {
  return value as T;
}

function subscribe<T>(
  mountedRef: MountedRef,
  tracker: TrackerRef,
  fn: TrackFn | undefined,
  params: string[],
  setValue: (value: T) => void,
  {
    transform = transformIdentity,
    withParams,
    withParamsTransform,
  }: CallOptions<T> = {},
): void {
  unsubscribe(tracker);

  setTimeout((): void => {
    if (mountedRef.current) {
      // FIXME NMap support
      if (fn) {
        // swap to active mode
        tracker.current.isActive = true;

        tracker.current.subscriber = (
          fn as (...params: unknown[]) => Promise<VoidFn>
        )(...params, (value: Codec): void => {
          // we use the isActive flag here since .subscriber may not be set on immediate callback)
          if (mountedRef.current && tracker.current.isActive) {
            mountedRef.current &&
              tracker.current.isActive &&
              setValue(
                withParams
                  ? ([params, transform(value)] as any)
                  : withParamsTransform
                  ? transform([params, value])
                  : transform(value),
              );
          }
        });
      } else {
        tracker.current.subscriber = null;
      }
    }
  }, 0);
}

export const useCall = (
  fn: PromiseRpcResult<AnyFunction>,
  params: string[],
  options?: CallOptions<any>,
) => {
  const mountedRef = useIsMountedRef();
  const tracker = useRef<Tracker>({
    isActive: false,
    serialized: null,
    subscriber: null,
  });
  const [value, setValue] = useState<any | undefined>(
    (options || {}).defaultValue,
  );

  // initial effect, we need an un-subscription
  useEffect((): (() => void) => {
    return () => unsubscribe(tracker);
  }, []);

  // on changes, re-subscribe
  useEffect((): void => {
    // check if we have a function & that we are mounted
    if (mountedRef.current && fn) {
      const [serialized, mappedParams] = extractParams(fn, params, options);

      if (mappedParams && serialized !== tracker.current.serialized) {
        tracker.current.serialized = serialized;

        subscribe(mountedRef, tracker, fn, mappedParams, setValue);
      }
    }
  }, [fn, mountedRef, params, options]);
  return value;
};
