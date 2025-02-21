import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "../services/email.service";
import { Editor } from '@tinymce/tinymce-react';
//import { htmlToText } from 'html-to-text';
function EmailSender() {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: '',
    });

    const [sending, setSending] = useState(false);
    const editorRef = useRef(null);

    function handleFieldChange(event, name) {
        setEmailData({ ...emailData, [name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(emailData);
        
        if (emailData.to === '' || emailData.subject === '' || editorRef.current.getContent() === '') {
            toast.error("Invalid fields");
            return;
        }

        try {
            setSending(true);
            // const plainTextMessage = htmlToText(editorRef.current.getContent());
            // await sendEmail({
            //     ...emailData,
            //     message: plainTextMessage})
            await sendEmail({
                ...emailData,
                message: editorRef.current.getContent()
            });
            toast.success("Email sent successfully");
            setEmailData({ to: '', subject: '', message: '' });
            editorRef.current.setContent(''); // Clear editor content
        } catch (error) {
            console.error(error);
            toast.error("Email not sent!");
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center"> 
            <div className="email_card md:w-1/2 w-full px-4 md:mx-0 bg-white rounded border shadow"> 
                <h1 className="text-gray-900 text-3xl mt-3">Email Sender</h1>
                <p className="text-gray-900">Send an email to your favorite person with your own app...</p>
                <form onSubmit={handleSubmit}>
                    <div className="input_field mt-4">
                        <label htmlFor="to-input" className="block mb-2 text-sm font-medium text-gray-900">To</label>
                        <input 
                            value={emailData.to} 
                            onChange={(event) => handleFieldChange(event, "to")} 
                            type="text" 
                            id="to-input" 
                            placeholder="Enter recipient's email" 
                            className="block w-full p-4 text-gray-900 border border-green-500 rounded-lg bg-gray-50"
                        />
                    </div>
                    
                    <div className="input_field mt-4">
                        <label htmlFor="subject-input" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                        <input 
                            value={emailData.subject} 
                            onChange={(event) => handleFieldChange(event, "subject")} 
                            type="text" 
                            id="subject-input" 
                            placeholder="Enter subject" 
                            className="block w-full p-4 text-gray-900 border border-blue-500 rounded-lg bg-gray-50"
                        />
                    </div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 mt-3">Your message</label>
                    <div className="input_field mt-4 border border-orange-500 rounded-lg">
                        
                        <Editor
                        onEditorChange={(event)=>{

                            setEmailData({...emailData,'message':editorRef.current.getContent()})
                        }}
                            onInit={(evt, editor) => {editorRef.current = editor;}}
                            apiKey="4ygnxqtjctgb7ak5ja4ax4cp8zoqvt5dkwf3nh1ueswogbtr"
                             initialValue="<p>This is the initial content of the editor.</p>"
                             init={{
                                plugins: [
                                  // Core editing features
                                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                  // Your account includes a free trial of TinyMCE premium features
                                  // Try the most popular premium features until Nov 25, 2024:
                                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                  // Early access to document converters
                                  'importword', 'exportword', 'exportpdf'
                                ],
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                  { value: 'First.Name', title: 'First Name' },
                                  { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                                exportword_converter_options: { 'document': { 'size': 'Letter' } },
                                importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
                              }}
                        />
                    </div>
                    
                    {sending && (
                        <div className="loader flex-col gap-2 items-center flex justify-center mt-4">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h1>Sending Email</h1>
                        </div>
                    )}

                    <div className="button_container flex justify-center gap-2 mt-4 mb-2">
                        <button type="submit" className="hover:bg-blue-500 text-white bg-blue-800 px-3 py-2 rounded">
                            Send Email
                        </button>
                        <button type="button" onClick={() => {
                            setEmailData({ to: '', subject: '', message: '' });
                            editorRef.current.setContent(''); // Clear editor
                        }} className="hover:bg-gray-500 text-white bg-gray-800 px-3 py-2 rounded">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmailSender;
