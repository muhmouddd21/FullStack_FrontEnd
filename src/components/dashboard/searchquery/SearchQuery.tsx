import { Form } from "react-bootstrap";

interface SearchQueryProps {
  setSearchQuery: (value: string) => void;
  searchQuery:string;
}
const SearchQuery = ({ setSearchQuery,searchQuery }: SearchQueryProps) => {

  const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  };

  return (
    <div className="mb-3">
      <h5>Search</h5>
      <Form onSubmit={querySubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchQuery;