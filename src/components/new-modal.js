import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { postThought } from '../utils/thoughts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

export function NewModal(props) {
    const containerRef = useRef(null)
    const [newMessage, setNewMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useClickAway(containerRef, () => !isError && props.onClose())

    async function onSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
            await postThought(newMessage)

            props.onSubmit(newMessage)
            setIsError(false)

            setIsLoading(false)
            props.onClose()
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            props.onError('An error happened', {
                name: 'Retry',
                method: () => onSubmit(e),
            })
        }
    }

    return (
        <div
            className="fixed inset-0 grid place-items-center backdrop-brightness-50"
            ref={(node) =>
                node &&
                (isLoading
                    ? node.setAttribute('inert', '')
                    : node.removeAttribute('inert'))
            }
        >
            <dialog
                open
                ref={containerRef}
                className="w-[75%] rounded-lg bg-stone-800 py-4 px-3 sm:w-96"
            >
                <main>
                    <form method="dialog" onSubmit={onSubmit}>
                        <label className="sr-only" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            autoFocus
                            value={newMessage}
                            onChange={(event) =>
                                setNewMessage(event.target.value)
                            }
                            className="block h-32 w-full resize-none rounded border-[1px] border-stone-700 bg-transparent text-sm text-stone-50 caret-orange-500 focus:border-orange-500 focus:shadow-none"
                        ></textarea>

                        <div className="mt-2 flex items-center justify-end gap-2">
                            <button
                                value="cancel"
                                onClick={props.onClose}
                                className="button py-.5 rounded bg-stone-400 px-2 text-sm font-bold text-stone-50"
                            >
                                Cancel
                            </button>
                            <button
                                value="default"
                                className="button py-.5 rounded bg-orange-500 px-2 text-sm font-bold text-stone-50"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </main>
                <footer className="mt-4">
                    <p className="text-xs text-stone-300">
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                        Whatever you write will become public.
                    </p>
                </footer>
            </dialog>
        </div>
    )
}
