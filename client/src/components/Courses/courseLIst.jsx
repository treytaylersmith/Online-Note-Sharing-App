import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSES } from "../../utils/queries";
import {Link} from 'react-router-dom';


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
                                <li key={course._id}>
                                    <Link to={`../pages/course/${course._id}`}>
                                        {course.name}
                                    </Link>
                                </li>
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