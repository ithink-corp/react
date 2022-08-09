import { Transition } from 'react-transition-group'

export function Snackbar(props) {
    const duration = 300

    const defaultStyle = {
        transition: `transform ${duration}ms ease-in-out`,
        transform: 'translateY(200%) translateX(-50%)',
    }

    const transitionStyles = {
        entering: { transform: 'translateY(0) translateX(-50%)' },
        entered: { transform: 'translateY(0) translateX(-50%)' },
        exiting: { transform: 'translateY(200%) translateX(-50%)' },
        exited: { transform: 'translateY(200%) translateX(-50%)' },
    }

    return (
        <div>
            <Transition in={props.isOpen} timeout={500}>
                {(state) => (
                    <dialog
                        open
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                        className="fixed bottom-0 left-1/2 isolate m-0 mb-4 flex min-w-[70%] max-w-[90%] transform items-center justify-between truncate rounded bg-stone-50/10 py-2 px-4 text-sm text-stone-50 shadow-md shadow-stone-800 backdrop-blur-lg sm:left-0 sm:ml-4 sm:w-72 sm:min-w-0 sm:translate-x-0"
                    >
                        <main>{props.message}</main>
                        <footer>
                            {props.action && (
                                <button
                                    className="hover:filer rounded-sm bg-stone-700 px-2 py-1 text-stone-50 hover:brightness-110 active:brightness-90"
                                    onClick={() =>
                                        props.action.method() && props.onClose()
                                    }
                                >
                                    {props.action.name}
                                </button>
                            )}
                        </footer>
                    </dialog>
                )}
            </Transition>
        </div>
    )
}
