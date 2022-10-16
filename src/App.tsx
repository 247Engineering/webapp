import { Routes, Route } from 'react-router-dom'
import AuthedLayout from './components/AuthedLayout'
import UnauthedLayout from './components/UnauthedLayout'

export default function App() {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route path="/" element={<div></div>} />
      </Route>

      <Route path="/dashboard" element={<AuthedLayout />}>
        <Route path="" element={<div></div>} />
      </Route>
    </Routes>
  )
}
