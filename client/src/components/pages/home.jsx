import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSES } from "../../utils/queries";


function Home(props){
    const { loading, error, data } = useQuery(QUERY_ALL_COURSES);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error :</div>; 
        
    const courses = data.courses;
    
    const courseList = courses.map(course => <li  key={course._id}>{course.name}</li>);

    return(
        <div className="container mt-5" >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <h5 className="card-title">Courses</h5>
                <p className="card-text"></p>
                <ul className="me-4">
                    <li className="list-unstyled" >{courseList}</li>
                </ul>
            </div>
            </div>
            </div>
        </div>
    </div>
    );

}

export default Home;