import { Patch } from '../src/rxio'
import { of, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { marbles } from 'rxjs-marbles'

const addPatch = Patch<{ a$: number; b$: number }, { value$: number }>(({ a$, b$ }) => {
  return {
    value$: combineLatest(a$, b$).pipe(map(([a, b]) => a + b))
  }
})

describe('Patch', () => {
  it(
    'should return an Observable map',
    marbles(m => {
      const values = { a: 2, b: 3, c: 5 }
      const a$ = m.cold('--(a|)', values)
      const b$ = m.cold('---(b|)', values)
      const expectedValue$ = m.cold('---(c|)', values)

      const sum = addPatch({ a$, b$ })

      m.expect(sum.value$).toBeObservable(expectedValue$)
    })
  )
})
