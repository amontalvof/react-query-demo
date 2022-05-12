import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            enabled: false,
        }
    );

    console.log({ isLoading, isFetching });

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <button className="btn btn-primary mb-2" onClick={refetch}>
                Fetch Heroes
            </button>
            {data?.data.map((hero) => {
                return <div key={hero.name}>{hero.name}</div>;
            })}
        </>
    );
};
