interface addressData {
  address_key: number;
  address_name: string;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  is_default: string;
}

interface Window {
  IMP: any;
  handleAddressChange: (address: addressData) => void;
}
