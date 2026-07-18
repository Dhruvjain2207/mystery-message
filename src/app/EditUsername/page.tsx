
import { auth } from "@/lib/auth";
import Editusernameform from "@/components/editusernameform";



async function EditUsernamePage() {

  const session=await auth();

  

  return (
          <Editusernameform propusername={session?.user.username}/>
  );
}

export default EditUsernamePage;
