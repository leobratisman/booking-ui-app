export const emailRules = [
    value => {
      if (value) return true

      return 'E-mail is requred.'
    },
    value => {
      if (/.+@.+\..+/.test(value)) return true

      return 'E-mail must be valid.'
    },
]

export const passwordRules = [
    value => {
      if (value) return true

      return 'Password is required.'
    },
    value => {
      if (value?.length >= 1) return true

      return 'Password must be greater than 0 characters.'
    },
]

export const ageRules = [
    value => {
      if (value) return true

      return 'Age is required.'
    },
    value => {
      if (Number(value)) return true

      return 'Age should be number'
    },
]

export const usernameRules = [
    value => {
      if (value) return true

      return 'Username is required.'
    },
    value => {
        if (value?.length >= 1) return true

        return 'Username must be greater than 0 characters.'
    },
]

export const locationRules = [
  value => {
    if (value) return true

    return 'Location is required.'
  }
]

export const dateRules = [
  value => {
    if (value) return true

    return 'Date is required.'
  }
]

export const nameRules = [
  value => {
    if (value) return true

    return 'name is required.'
  },
]

export const roomsQuantityRules = [
  value => {
    if (value) return true

    return 'Quantity is required.'
  },
  value => {
    if (Number(value)) return true

    return 'Quantity should be number'
  },
]

export const imageIdRules = [
  value => {
    if (value) return true

    return 'Image id is required.'
  }
]