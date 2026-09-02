import './App.css';
import UserListBefore from './components/UserListBefore';
import UserListAfter from './components/UserListAfter';
import NetworkDemo from './components/NetworkDemo';

/**
 * App - მთავარი კომპონენტი
 *
 * სტრუქტურა:
 * 1. Before vs After Comparison - ორ სვეტად იყოფა
 *    - UserListBefore: არაოპტიმიზებული, ბევრი რე-რენდერი
 *    - UserListAfter: ოპტიმიზებული React.memo, useMemo, useCallback-ით
 *
 * 2. Network Demo - API debugging დემონსტრაცია
 *    - fetch calls
 *    - loading/error/success states
 *    - response time tracking
 *
 * როგორ გამოვიყენოთ:
 * - აკრიფეთ search field-ში
 * - დააკვირდით render count-ს Before და After სექციებში
 * - გახსენით React DevTools Profiler რენდერების ანალიზისთვის
 * - გახსენით Browser DevTools Network Tab API მოთხოვნების სანახავად
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>User Directory</h1>
        <p className="app-subtitle">
          Re-renders და Network Debugging — Before vs After ოპტიმიზაცია
        </p>
      </header>

      <div className="sections-container">
        {/* Before vs After — ორ სვეტად */}
        <div className="comparison-row">
          <div className="section section--before">
            <div className="section-header">
              <span className="icon">&#9888;</span>
              ოპტიმიზაციამდე (Before)
            </div>
            <div className="section-body">
              <UserListBefore />
            </div>
          </div>

          <div className="section section--after">
            <div className="section-header">
              <span className="icon">&#10004;</span>
              ოპტიმიზაციის შემდეგ (After)
            </div>
            <div className="section-body">
              <UserListAfter />
            </div>
          </div>
        </div>

        {/* API Demo — სრულ სიგანეზე */}
        <div className="section section--api">
          <div className="section-header">
            <span className="icon">&#127760;</span>
            API Demo — Network Debugging
          </div>
          <div className="section-body">
            <NetworkDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
