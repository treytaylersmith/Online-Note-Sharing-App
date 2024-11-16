import {useQuery} from '@apollo/client';
import {QUERY_COURSE} from '../../utils/queries';
import { useParams } from 'react-router-dom';

function Course(){
    const { _id } = useParams();
    const { loading, error, data } = useQuery(QUERY_COURSE, {
        variables: {id: _id},
       
    });
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) {
        console.error("GraphQL Error:", error);
        return <div>Error: {error.message}</div>;
    }

    if (!data || !data.course) {
        return <div>No course data found for the provided ID.</div>;
    }
    
    return (
        <div>
        <h1>{data.course.name}</h1>
        <p>ID: {data.course._id}</p>
        <p>Assignments: {data.course.assignments}</p>
        <p>Start Date: {data.course.startDate}</p>
        <p>End Date: {data.course.endDate}</p>
        {/* Render notes */}
         <div>
            <h2>Notes:</h2>
            {data.course.notes.map(note => (
                <div key={note._id}>
                    <p>{note.createdAt}</p>
                    <p>{note.noteAuthor}</p>
                    <p>{note.text}</p>
                </div>
            ))}
        </div> 
    </div>
    );
}
export default Course;