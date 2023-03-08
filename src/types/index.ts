export type UserType = "distributor" | "warehouse" | "retailer" | "logistics";

export interface UserContext {
  firstName?: string;
  lastName?: string;
  id: string;
  type: UserType;
}

export interface AuthContextType {
  user: UserContext;
  login: (data: UserContext) => Promise<void>;
  logout: () => void;
}

export interface AuthState {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  id: string | null;
  type: UserType | null;
  loading: boolean;
  resetPasswordStamp: number | string | null;
  businessName: string | null;
  vehicleNumber: string | null;
  stepsCompleted: number;
}

export interface InputProps {
  label: string;
  options?: { value: string; label: string }[];
  type?: string;
  value: any;
  image?: any;
  onChange: (value: any) => void;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  alternate?: boolean;
  default?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

export interface ButtonProps {
  text: any;
  className?: string;
  onClick: (e: any) => void;
  disabled?: boolean;
  style?: {};
  loading?: boolean;
  type?: "submit" | "button";
}

export interface OnboardingRadioProps {
  id: string;
  name: string;
  value: string;
  textPrimary: string;
  textSecondary: string;
  img: any;
  imgChecked: any;
  checked: boolean;
  onChange: (value: any) => void;
  className: string;
}

export interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export interface IconProgressBarProps extends ProgressBarProps {
  images: any[];
  subtext?: string[];
}

export interface AccountProgressStepProps {
  onClick: () => void;
  title: string;
  text: string;
  progress: string;
}

export interface DragAndDropProps {
  label?: string;
  data?: string;
  setData: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  color?: string;
  small?: boolean;
  className?: string;
  alt?: boolean;
}

export interface BusinessOwnerItemProps {
  name: string;
  title: string;
  id: string;
}

export interface PhoneNumberInputProps {
  code: string;
  mobile: string;
  setCode: (value: string) => void;
  setMobile: (value: string) => void;
}

export interface StatusProps {
  text: string;
  className?: string;
}

export interface CheckboxProps {
  label: any;
  id: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export interface MultiSelectCheckboxProps {
  items: any[];
  type: string;
  className?: string;
  onChange: (value: any) => void;
  isMultiSelect?: boolean;
  selected?: string;
}

export interface SortSelectProps {
  className?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface WarehouseItemProp {
  textPrimary: string;
  textSecondary: string;
}

export interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  lat: number;
  lng: number;
  markers?: {
    lat: number;
    lng: number;
    img?: string;
  }[];
}

export interface DatePickerProps {
  setSelectedRange: (range: any) => void;
  start: Date;
  end: Date;
  showCalendar: boolean;
  setShowCalendar: (value: boolean) => void;
}

export interface RequestArgs {
  method: "post" | "get" | "delete" | "put";
  url: string;
  body?: any;
  type?: "form-data" | "json";
  user?: UserType;
  onSuccess?: () => void;
}

export interface Owner {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  idImage: string | null;
}

export interface DistributorState {
  businessName: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  state: string | null;
  cac: string | null;
  owners?: Owner[];
  stepsCompleted?: number;
  loading?: boolean;
  warehouseStamp?: number | null;
  warehouses?: any[];
  warehouse?: any;
  order?: any;
  orders?: any[];
}

export interface AppLayoutProps {
  alternate?: boolean;
  hideLogo?: boolean;
  full?: boolean;
  location?: string;
  search?: boolean;
  cart?: boolean;
  logistics?: boolean;
  hideName?: boolean;
  children?: any;
  onClose?: () => void;
  setShowSideBar?: (value: boolean) => void;
  showSideBar?: boolean;
  secondaryNav?: string;
  secondaryNavBack?: string;
  back?: string;
  noPadding?: boolean;
}

export interface WeightInputProps {
  value: number;
  setValue: (value: any) => void;
  unit: string;
  setUnit: (value: string) => void;
}

export interface ProductState {
  name: string | null;
  description: string | null;
  price: number | null;
  discountedPrice: number | null;
  costPerItem: number | null;
  sku: string | null;
  trackQuantity: boolean | null;
  quantity: number | null;
  weightValue: number | null;
  weightUnit: string | null;
  category: string | null;
  categories: any[];
  subCategory: string | null;
  subCategories: any[];
  manufacturer: string | null;
  manufacturers: any[];
  images: string[];
  products: any[];
  viewedProduct: any;
  searchResult: any[];
  loading: boolean;
  productStamp: number | null;
}

export interface WarehouseProductProps {
  isEdit?: boolean;
  header: string;
  subHeader: string;
}

export interface SearchSelectProps extends InputProps {
  addNew?: boolean;
  itemImage?: boolean;
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
  options: any[];
  onSearch: (value: string) => void;
  onBlur: () => void;
  loading: boolean;
}

export interface Address {
  latitude: number;
  longitude: number;
}

export interface LocationInputProps {
  label: string;
  setLocation: (value: Address) => void;
  placeholder?: string;
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
}

export interface ProductItemProps {
  id: string;
  discount?: number;
  image: string;
  name: string;
  price: number;
  minOrder: number;
  unit?: string;
  orderAmount?: number;
}

export interface OrderCounterProps {
  className?: string;
  canReduce?: boolean;
  minOrder?: number;
  id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
  setQuantity: (value: any) => void;
}

export interface RetailerState {
  retailerStamp: string | number | null;
  loading: boolean;
  cartItems: CartItem[];
  cartId: string | null;
  orderId: string | null;
  orders: any[];
  order: any;
  warehouse: any
}

export type CartItem = {
  id: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export type DeliveryOptions = "priority" | "standard" | "schedule";

export type PaymentOptions = string; //'mastercard-****' | 'visa-****' | 'cash'

export interface PaymentOptionProps {
  id: string;
  name: string;
  value: string;
  text: string;
  checked: boolean;
  onChange: (value: any) => void;
  option: PaymentOptions;
  className?: string;
}

export interface SignInProps {
  type: UserType;
  forgotPassword: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PICKUP"
  | "DELIVERY"
  | "COMPLETED";

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export interface RouteObj {
  path: string;
  element: any;
}

export interface LogisticsState {
  vehicleNumber: string | null;
  loading: boolean;
  stepsCompleted: number;
}
