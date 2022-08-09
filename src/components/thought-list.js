import { ThoughtSkeleton } from './thought-skeleton'
import { ThoughtItem } from './thought-item'

export function ThoughtList(props) {
    if (!props.thoughts) {
        return (
            <div className="flex flex-wrap gap-2">
                {Array.from(Array(20).keys()).map((number) => (
                    <ThoughtSkeleton key={number.toString()} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="flex flex-wrap gap-2">
                {props.thoughts.map(({ message }, i) => (
                    <ThoughtItem key={i} message={message} />
                ))}
            </div>
        )
    }
}
