import { Comment } from "@/types/comment";
import PageWrapper from "@/components/PageWrapper";
import { DataTable, DataTableRowData } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useRouter } from "next/router";

interface DashboardProps {
  data: Comment[];
}

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export default function Dashboard({ data }: DashboardProps) {
  const router = useRouter();

  const [comments, setComments] = useState<Comment[]>(data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filteredData = data.filter((comment) => {
      return comment.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        comment.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        comment.body.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setComments(filteredData);
  };

  const header = (
    <div className="w-full flex flex-wrap gap-2 align-items-center justify-between">
      <h4 className="m-0">Manage Comments</h4>
      <input name="search" value={search} placeholder="Search..." className="border px-4 py-2" onChange={handleSearch} />
    </div>
  );

  const Button = ({ children, color = "bg-blue-500", onClick }: ButtonProps) => {
    return (
      <button className={`${color} text-white px-4 py-2 rounded`} onClick={onClick}>{children}</button>
    );
  };

  const DeleteModal = () => {
    return (
      <div className="fixed z-[10] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg">
          <h4>Are you sure you want to delete comment from
            <br />
            <span className="font-bold">&quot;{selectedComment?.name}&quot;</span> ?
          </h4>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button color="bg-red-500" onClick={handleDeleteComment}>Delete</Button>
          </div>
        </div>
      </div>
    )
  };

  const handleDeleteComment = async () => {

    if (!selectedComment) return;

    try {
      const id = selectedComment.id;
      const newData = data.filter((comment) => comment.id !== id);
      setComments(newData);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const actionBodyTemplate = (rowData: DataTableRowData<Comment[]>) => {
    return (
      <>
        <Button color="bg-red-500" onClick={() => {
          setShowDeleteModal(true);
          setSelectedComment(rowData);
        }} >
          Delete
        </Button >
      </>
    );
  };

  return (
    <PageWrapper>
      {showDeleteModal && <DeleteModal />}
      <div className="flex justify-end">
        <Button onClick={
          () => {
            router.push('/create');
          }
        }>Create comment</Button>
      </div>
      <div className="mt-4">
        <DataTable value={comments} paginator rows={10} dataKey="id" showGridlines globalFilterFields={['name', 'email', 'body']} header={header}>
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="body" header="Body" />
          <Column header="Action" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </PageWrapper>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await res.json() as Comment[];
  return {
    props: {
      data,
    },
  };
}