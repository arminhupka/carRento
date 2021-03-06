import React, {useRouter} from 'next/router';
import Head from 'next/head';
import {getSession} from 'next-auth/react';
import axios from 'axios';

// Utils
import server from '../../../utils/server';

// Hooks
import useModalState from '../../../hooks/useModalState';

// Layout
import MainLayout from '../../../layouts/MainLayout';

// Components
import Button from '../../../components/Button/Button';
import NewBrandModal from '../../../components/Modal/NewBrandModal/NewBrandModal';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const BrandsPage = ({brands}) => {
  const router = useRouter();
  const {isVisible, onOpen, onClose} = useModalState();

  const handleRemoveBrand = async (id) => {
    await axios({
      method: 'DELETE',
      url: `/api/brands/${id}`,
    });
    router.replace(router.asPath);
  };

  return (
    <MainLayout>
      <Head>
        <title>Marki | CarRento</title>
      </Head>
      {isVisible && <NewBrandModal onClose={onClose} />}
      <div className="container">
        <SectionTitle withButton title="Marki" buttonTitle="Dodaj +" buttonAction={onOpen} />
        <table className="table-auto w-full bg-white border rounded-md overflow-hidden shadow-lg">
          <thead className="block border-b py-2 text-white bg-red-500">
            <tr className="flex">
              <th className="flex-1">Marka</th>
              <th className="flex-1">Przypisanych samochodów</th>
              <th className="flex-1">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id} className="py-4 flex border-b last:border-b-0 hover:bg-gray-100 transition-colors">
                <td className="flex-1 flex items-center justify-center">{brand.name}</td>
                <td className="flex-1 flex items-center justify-center">{brand.cars.length}</td>
                <td className="flex-1 flex justify-center">
                  <Button bordered onClick={() => handleRemoveBrand(brand._id)}>
                    Usuń
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({req: ctx.req});

  if (!session) {
    return {
      redirect: {
        destination: '/logowanie',
        permanent: false,
      },
    };
  }

  const {data: brands} = await axios(`${server}/api/brands`);

  return {
    props: {
      session,
      brands,
    },
  };
};

export default BrandsPage;
