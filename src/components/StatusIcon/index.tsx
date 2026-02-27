import { FilterStatus } from "@/types/FilterStatus";
import { CircleCheck, CircleDashed } from 'lucide-react-native';

export function StatusIcon({ status }: { status: FilterStatus }) {
    return status === FilterStatus.PENDING ? (
        <CircleDashed size={18} color="#888888" />
    ) : (
        <CircleCheck size={18} color="#2c46b1" />
    );
}
