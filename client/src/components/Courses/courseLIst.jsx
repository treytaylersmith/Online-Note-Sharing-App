import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSES } from "../../utils/queries";
import {Link} from 'react-router-dom';
import ListItem from "../ListItem";

function CourseList(props){
    const { loading, error, data } = useQuery(QUERY_ALL_COURSES);
    
    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error :</div>; 

    return(
        <div className="container mt-5" >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <h5 className="card-title">Courses</h5>
                <p className="card-text"></p>
                <p>Browse through the available courses below:</p>
                        <ul className="me-4 list-unstyled">
                            {data.courses?.map((course) => (
                               
                                <ListItem key={course._id}>
                                {course.name}
                                {/* Link to the detailed page of the project */}
                                <Link
                                  to={`/course/${course._id}`}
                                  className="badge bg-primary rounded-pill"
                                >
                                    { console.log(course)}
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
    );

}

export default CourseList;