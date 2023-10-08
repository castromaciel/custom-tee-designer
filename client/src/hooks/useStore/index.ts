import state from "@/store"
import { useSnapshot } from "valtio"

const useStore = () => {
  const snap = useSnapshot(state)

  return snap
}

export default useStore