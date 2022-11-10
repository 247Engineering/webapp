export const productImageReducer = (
  state: string[],
  action: { type: 'add' | 'delete' | 'replace'; payload: string | string[] },
) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload as string]
    case 'delete':
      return state.filter((image) => action.payload !== image)
    case 'replace':
      return action.payload as string[]
  }
}
