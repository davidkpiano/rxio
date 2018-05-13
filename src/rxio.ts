import { Observable } from 'rxjs'

export type TypeMap = Record<string, any>

export type ObservableMap<T extends TypeMap> = { [key in keyof T]: Observable<T[key]> }
export interface Patch<I extends TypeMap, O extends TypeMap> {
  (inputs: ObservableMap<I>): ObservableMap<O>
}

export function Patch<I, O>(project: Patch<I, O>): Patch<I, O> {
  return project
}
