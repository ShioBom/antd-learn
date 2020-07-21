import { useRef } from "react";

export default function useCreation<T>(factory: () => T, deps: any[]) {
  const { current } = useRef({
    deps,
    result: undefined as undefined | T,
    initialized: false,
  })
  if (current.initialized === false && !isSameDeps(current.deps, deps)) {
    current.deps = deps;
    current.result = factory();
    current.initialized = true;
  }
  return current.result as T;
}

function isSameDeps(preDeps: any[], deps: any[]): boolean {
  if (deps === preDeps) {
    return true;
  }
  for (const i in preDeps) {
    if (deps[i] !== preDeps[i])
      return false;
  }
  return true;
}
