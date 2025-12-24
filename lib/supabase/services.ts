import { getSupabaseBrowserClient } from "./browser-client";

type ErrorMessage = string;

// trying to build out a class instead of reusing all the fetch methods all over the app again

class SuperBaseService {
    async function fetchData(Userid: Number || NULL){
        const my_error : ErrorMessage = "No authenticated !!"

        const supabase = getSupabaseBrowserClient();
        try{
            const { 
                data: {user},
            } = await supabase.auth.getUser();
            if(!user){
                throw new Error(my_error)
               
        }const {data, error:fetchError} = await supabase.from("tests").select("*").eq("authorid",user.id);
        if(fetchError) throw fetchError;
        
    }catch(err){
        console.log(err)

    }
    fetchData(Userid);

    }