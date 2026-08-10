export type Product = {
  id: string;
  company_id: string;
  created_at: string; 
  name: string;
  price: number;
  stock: number;
  description: string;
  Image: string;
};

export type Service = {
  id: string;
  created_at: string;
  price: number;
  name: string;
  description: string;
  company_id: string;
  Image: string;
  LenghtInSec: number | null | undefined
};
export type Worker = {
  id: string;
  created_at: string;
  role: string | null | undefined;
  messages: boolean;
  name: string;
  company_id: string;
  auto_accept: boolean;
};
export type Admin = {
    company_id: string;
    worker_id: string;
}
export type Booking = {
  id: string;
  created_at: string;
  company_id: string;
  worker_id: string;
  service_id: string;
  customer_id: string;
  start_time: string;
  end_time: string;
  date: string;
  status: status;
};
export type Company = {
  id: string;
  created_at: string;
  name: string
}
export type Custumer = {
    custumer_id: string;
    created_at: string;
    mail: string;
    phone: number;
    name: string;
    company_id: string
}
export type Product_booking = {
    id: string; 
    created_at: string;
    product_id: string;
    custumer_id: string;
    status: ProdStatus;
    company_id: string
}
export type Worker_calendar = {
    id: string;
    worker_id: string;
    date: string;
    start_time: string;
    end_time: string;
    service_id: string
}
export type worker_services = {
    worker_id: string;
    service_id: string;
    company_id: string;
}
export type User = {
  id: string
  email?: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}
export type status = "Pending" | "Denied" | "Accepted"
export type ProdStatus = "Picked_Up" | "Canceled" | "Waiting"