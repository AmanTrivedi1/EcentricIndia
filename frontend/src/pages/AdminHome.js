import AdminProductList from "../features/admin/components/AdminProductList";

import NewNavbar from "../features/navbar/NewNavbar";
function AdminHome() {
  return (
    <div>
      <NewNavbar />
      <AdminProductList />
    </div>
  );
}

export default AdminHome;
