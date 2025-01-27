import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const dbConnect = async ()=>{



}
export default dbConnect;  // export default dbConnect;  // export default dbConnect;  // export