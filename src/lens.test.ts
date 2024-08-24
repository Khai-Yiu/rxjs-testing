import { describe, it, expect, test } from 'vitest';
import lens, { over, set, view } from './lens'

type User = {
  name: string
  address: {
    city: string
    zip: string
  }
}
describe('lens', () => {
  const user: User = {
    name: 'Alice',
    address: { city: 'Wonderland', zip: '12345' },
  }
  const nameLens = lens<User, string>(
    (user) => user.name,
    (newName, user) => ({ ...user, name: newName }),
  )
  const cityLens = lens<User, string>(
    (user) => user.address.city,
    (newCity, user) => ({
      ...user,
      address: { ...user.address, city: newCity },
    }),
  )
  describe('view', () => {
    it('retrieves a value using the lens', () => {
      expect(view(nameLens, user)).toBe('Alice')
      expect(view(cityLens, user)).toBe('Wonderland')
    })
  })
  describe(`set`, () => {
    it('updates a value using the lens', () => {
      expect(view(nameLens, user)).toBe('Alice')
      const setNameResult = set(nameLens, 'Bob', user)
      expect(view(nameLens, setNameResult)).toBe('Bob')
      expect(setNameResult).not.toBe(user)
    })
  })
  describe(`over`, () => {
    test('modifies a value using the lens', () => {
      const upperCasedUser = over(
        nameLens,
        (s: string) => s.toUpperCase(),
        user,
      )
      expect(upperCasedUser).toEqual({
        address: { city: 'Wonderland', zip: '12345' },
        name: 'ALICE',
      })
      expect(upperCasedUser).not.toBe(user)
    })
  })
  describe('state copying behaviour', () => {
    interface DeepState {
      user: User
      meta: {
        created: string
        modified: string
      }
    }
    const userLens = lens<DeepState, User>(
      (state) => state.user,
      (newUser, state) => ({ ...state, user: newUser }),
    )
    const deepState: DeepState = {
      user: { name: 'Alice', address: { city: 'Wonderland', zip: '12345' } },
      meta: { created: '2023-01-01', modified: '2024-01-01' },
    }
    const deepCityLens = lens<DeepState, string>(
      (state) => view(cityLens, state.user),
      (newCity, state) =>
        set(userLens, set(cityLens, newCity, state.user), state),
    )
    describe(`set`, () => {
      test('copies the state correctly and only update the necessary parts', () => {
        const updatedState = set(deepCityLens, 'Oz', deepState)
        expect(updatedState).toEqual({
          user: {
            name: 'Alice',
            address: { city: 'Oz', zip: '12345' },
          },
          meta: { created: '2023-01-01', modified: '2024-01-01' },
        })
        expect(updatedState.meta).toBe(deepState.meta)
        expect(updatedState.user).not.toBe(deepState.user)
        expect(updatedState.user.name).toBe(deepState.user.name)
        expect(updatedState.user.address).not.toBe(deepState.user.address)
        expect(updatedState.user.address.city).not.toBe(
          deepState.user.address.city,
        )
      })
    })
    describe(`over`, () => {
      test('modifies the state correctly and only update the necessary parts', () => {
        const upperCaseCityState = over(
          deepCityLens,
          (city) => city.toUpperCase(),
          deepState,
        )
        expect(upperCaseCityState).toEqual({
          user: {
            name: 'Alice',
            address: { city: 'WONDERLAND', zip: '12345' },
          },
          meta: { created: '2023-01-01', modified: '2024-01-01' },
        })
        expect(upperCaseCityState.meta).toBe(deepState.meta)
        expect(upperCaseCityState.user).not.toBe(deepState.user)
        expect(upperCaseCityState.user.name).toBe(deepState.user.name)
        expect(upperCaseCityState.user.address).not.toBe(deepState.user.address)
        expect(upperCaseCityState.user.address.city).not.toBe(
          deepState.user.address.city,
        )
      })
    })
  })
})
