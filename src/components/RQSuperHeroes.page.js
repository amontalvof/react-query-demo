import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useAddSuperHeroData,
    useSuperHeroesData,
} from '../hooks/useSuperHeroesData';

export const RQSuperHeroesPage = () => {
    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

    const onSuccess = (data) => {
        console.log('Perform side effect after data fetching', data);
    };

    const onError = (error) => {
        console.log('Perform side effect after encountering an error', error);
    };

    const { isLoading, data, isError, error, isFetching, refetch } =
        useSuperHeroesData(onSuccess, onError);

    const { mutate: addHero } = useAddSuperHeroData();

    const handleAddHeroClick = () => {
        const hero = { name, alterEgo };
        if (name && alterEgo) {
            addHero(hero);
        }
    };

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div style={{ display: 'flex' }}>
                <input
                    style={{ width: '200px', marginRight: '10px' }}
                    className="form-control mb-2"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    style={{ width: '200px', marginRight: '10px' }}
                    className="form-control mb-2"
                    placeholder="Alter Ego"
                    type="text"
                    value={alterEgo}
                    onChange={(e) => setAlterEgo(e.target.value)}
                />
                <button
                    className="btn btn-warning mb-2"
                    onClick={handleAddHeroClick}
                >
                    Add Hero
                </button>
            </div>
            <button className="btn btn-primary mb-2" onClick={refetch}>
                Fetch Heroes
            </button>
            {data?.data.map((hero) => {
                return (
                    <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>
                            {hero.name}
                        </Link>
                    </div>
                );
            })}
            {/* {data.map((heroName) => {
                return <div key={heroName}>{heroName}</div>;
            })} */}
        </>
    );
};
