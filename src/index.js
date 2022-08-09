import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThoughtList } from './components/thought-list'
import { NewModal } from './components/new-modal'
import { Snackbar } from './components/snackbar'

import { getThoughts } from './utils/thoughts'

import { debounce } from 'lodash'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNewModalOpen: false,
            isSnackbarOpen: false,
            snackbar: null,
            thoughts: null,
        }
    }

    componentDidMount() {
        this.loadItems()
    }

    loadItems = async () => {
        try {
            const thoughts = await getThoughts()

            this.setState({
                thoughts: thoughts,
            })
        } catch (error) {
            this.createSnackbar('Failed to load data', {
                name: 'Retry',
                method: this.loadItems,
            })
        }
    }

    toggleModal = () => {
        this.setState((previousState) => ({
            isNewModalOpen: !previousState.isNewModalOpen,
        }))
    }

    createSnackbar = (message, action, duration) => {
        this.closeSnackbar()
        clearTimeout(this.snackbarTimeout)

        setTimeout(() => {
            this.setState({
                isSnackbarOpen: true,
                snackbar: {
                    message,
                    action,
                },
            })

            if (duration && duration > 0) {
                this.snackbarTimeout = setTimeout(this.closeSnackbar, duration)
            }
        }, 300)
    }

    closeSnackbar = () => {
        this.setState({
            isSnackbarOpen: false,
        })
        debounce(() => {
            this.setState({
                snackbar: null,
            })
        }, 300)
    }

    addItem = (message) => {
        this.state.thoughts.push({ message })
        this.createSnackbar('Posted!', null, 3000)
    }

    render() {
        return (
            <div>
                <header className="flex items-center justify-between bg-stone-800 py-1 px-3">
                    <h1 className="text-lg font-bold text-stone-50">ithink</h1>
                    <button
                        className="btn py-.5 rounded bg-orange-500 px-2 font-bold text-stone-50"
                        onClick={this.toggleModal}
                    >
                        New
                    </button>
                </header>

                <main className="mx-2 mt-4 mb-8">
                    <ThoughtList thoughts={this.state.thoughts} />
                </main>

                {this.state.isNewModalOpen && (
                    <NewModal
                        onError={(message, action) =>
                            this.createSnackbar(message, action, 5000)
                        }
                        onClose={this.toggleModal}
                        onSubmit={this.addItem}
                    />
                )}

                <Snackbar
                    message={this.state.snackbar && this.state.snackbar.message}
                    action={this.state.snackbar && this.state.snackbar.action}
                    isOpen={Boolean(this.state.isSnackbarOpen)}
                    onClose={this.closeSnackbar}
                />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
