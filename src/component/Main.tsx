import ThemeSwitcher from '../themeprovide/ThemeSwitcher';

function Main() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Expense Tracker</h1>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Main;
