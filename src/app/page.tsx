import Image from "next/image";
import styles from "./page.module.css";

function GetData(){
  return 'hello world'
}
export default function Home() {
  return (
    <label>{GetData()}</label>
  )
}
