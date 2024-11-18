import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSES } from "../../utils/queries";
import { Link } from "react-router-dom";
import ListItem from "../ListItem";
import Lib from '../../assets/library.jpg';

import Left from '../../assets/leftImage.jpg';

function CourseList(props) {
  const { loading, error, data } = useQuery(QUERY_ALL_COURSES);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error :</div>;

  return (
//    
<div className="container-fluid p-0">
  {/* Full-Width Top Image */}
  <div className="w-100">
    <img
      src={Lib}
      className="img-fluid"
      alt="Library"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        maxHeight: "300px",
      }}
    />
  </div>

  {/* Course List Section */}
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <div className="card shadow-lg">
          <div className="card-body text-center">
            <h4 className="card-title text-primary">Courses</h4>
            <p>Browse through the available courses below:</p>
            <ul className="list-unstyled">
              {data.courses?.map((course) => (
                <ListItem
                  key={course._id}
                  className="d-flex justify-content-between align-items-center m-2"
                >
                  <span>{course.name}</span>
                  <Link
                    to={`/course/${course._id}`}
                    className="badge bg-primary rounded-pill text-decoration-none"
                  >
                    See More
                  </Link>
                </ListItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default CourseList;
