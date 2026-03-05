import React from 'react';
import YourPropertierVeiw from '@/component/seller/YourPropertierVeiw';

const page = async ({ params }) => {
  const { userid } = await params;

  return (
    <>
      <YourPropertierVeiw userId={userid} />
    </>
  );
};

export default page;