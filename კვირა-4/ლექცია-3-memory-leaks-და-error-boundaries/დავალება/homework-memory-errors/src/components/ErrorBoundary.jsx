import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 ErrorBoundary:', error.message)
    console.error('კომპონენტების ჯაჭვი:', errorInfo.componentStack)

    this.setState({ error })
  }

  handleRetry = () => {
    console.log('🔁 ხელახლა ცდა')
    this.setState({ error: null })
  }

  render() {
    return this.props.children
  }
}
