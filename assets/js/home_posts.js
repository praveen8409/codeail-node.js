{
    // Method to submit the form data for new post using Ajax

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    console.log(data);
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();

    // Methos to create a post in DOM
}