import PropertierDetailsView from '@/component/seller/PropertierDetailsView';


 const page = async ({ params }) => {
    const { propertiesid } = await params;

  return (
    <>
    <PropertierDetailsView propertiesid={propertiesid} />
    </>
  )
};
export default page;