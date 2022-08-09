export function ThoughtItem(props) {
    return (
        <p className="text-sm bg-stone-800 text-stone-50 border-stone-50/10 border-[1px] px-2 py-1 rounded w-48 min-h-[4rem]">
            {props.message}
        </p>
    )
}
