import SearchForm from "./SearchForm";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <div className="header">
      <ThemeToggle />
      <SearchForm />
    </div>
  );
}

export default Header;
