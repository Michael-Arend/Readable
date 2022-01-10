import { useSelector, RootStateOrAny } from "react-redux";
import { ICategory } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CategoryBox = () => {
  const params = useParams();
  const category = params.category;
  const navigate = useNavigate();
  const categories: ICategory[] = useSelector(
    (state: RootStateOrAny) => state.postsContent.categories
  );

  const categoryClickedHandler = (url: string) => {
    navigate(`/${url}`);
  };

  return (
    <div className="category-box-wrapper">
      <div className="category-box-header"></div>
      <div className="category-content-wrapper">
        <h2>Which Category do you want to see?</h2>
        <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          all
        </h3>
        {categories.map((c: ICategory) =>
          category !== c.name ? (
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => categoryClickedHandler(c.name)}
              key={c.name}
            >
              {c.name}
            </h3>
          ) : (
            <h3
              style={{ cursor: "pointer", color: "var(--light-color)" }}
              onClick={() => categoryClickedHandler(c.name)}
              key={c.name}
            >
              {c.name}
            </h3>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryBox;
