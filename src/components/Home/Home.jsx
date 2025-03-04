import ButtonNov from '../ButtonNov/ButtonNov';
import ButtonForm from '../ButtonRep/ButtonRep';
import MisReportes from '../MisReportes/MisReportes';

function Home() {
    return (
        <div>
        <h2>Hola! ¿Que vamos a subir hoy? </h2>
        <ButtonNov/>
        <ButtonForm/>
        <MisReportes/>
        </div>
    );
}

export default Home;