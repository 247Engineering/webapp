export interface UserContext {
  firstName?: string
  lastName?: string
  id: string
}

export interface AuthContextType {
  user: UserContext
  login: (data: UserContext) => Promise<void>
  logout: () => void
}

export interface AuthState {
  firstName: string | null
  lastName: string | null
  id: string | null
  type: string | null
  loading: boolean
}

export interface InputProps {
  label: string
  options?: { value: string; label: string }[]
  type?: string
  value: string
  image?: any
  onChange: (value: string) => void
  error?: boolean
  errorText?: string
}

export interface ButtonProps {
  text: any
  className?: string
  onClick: (e: any) => void
  disabled?: boolean
  style?: {}
  loading?: boolean
}

export interface OnboardingRadioProps {
  id: string
  name: string
  value: string
  textPrimary: string
  textSecondary: string
  img: any
  imgChecked: any
  checked: boolean
  onChange: (value: string) => void
  className: string
}

export interface ProgressBarProps {
  step: number
  totalSteps: number
}

export interface AccountProgressStepProps {
  onClick: () => void
  title: string
  text: string
  progress: string
}

export interface DragAndDropProps {
  label: string
  data?: string
  setData: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

export interface BusinessOwnerItemProps {
  name: string
  title: string
  id: string
}

export interface PhoneNumberInputProps {
  code: string
  mobile: string
  setCode: (value: string) => void
  setMobile: (value: string) => void
}

export interface StatusProps {
  text: string
  className?: string
}

export interface CheckboxProps {
  label: any
  id: string
  checked: boolean
  onChange: () => void
  className?: string
}

export interface SortSelectProps {
  className?: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export interface WarehouseItemProp {
  textPrimary: string
  textSecondary: string
}

export interface MapProps {
  center: {
    lat: number
    lng: number
  }
  lat: number
  lng: number
}

export interface DatePickerProps {
  setSelectedRange: (range: any) => void
  start: Date
  end: Date
  showCalendar: boolean
  setShowCalendar: (value: boolean) => void
}

export interface RequestArgs {
  method: 'post' | 'get' | 'delete' | 'put'
  url: string
  body?: any
  type?: 'form-data' | 'json'
}

export interface Owner {
  firstName: string | null
  lastName: string | null
  phoneNumber: string | null
  email: string | null
  idImage: string | null
}

export interface DistributorState {
  businessName: string | null
  address: string | null
  city: string | null
  country: string | null
  state: string | null
  cac: string | null
  owners?: Owner[]
  stepsCompleted?: number
  loading?: boolean
}

export interface AppLayoutProps {
  alternate?: boolean
  full?: boolean
  children?: any
  onClose?: () => void
}
