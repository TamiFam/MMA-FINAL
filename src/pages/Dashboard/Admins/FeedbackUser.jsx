import React, { useState, useEffect } from 'react';
import { BiMailSend } from "react-icons/bi";
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FeedbackUser = ({ userId }) => 
console.log(first)
// {
//   const [comment, setComment] = useState(''); // Состояние для хранения комментария
//   const [comments, setComments] = useState([]); // Состояние всех комментариев
//   const axiosSecure = useAxiosSecure();

//   // Функция для получения комментариев пользователя
//   const fetchComments = async () => {
//     try {
//       const response = await axiosSecure.get(`/api/comments/${userId}`);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Ошибка при получении комментариев:', error);
//     }
//   };

//   useEffect(() => {
//     fetchComments(); // Получаем комментарии при монтировании компонента
//   }, [userId]);

//   const handleCommentChange = (event) => {
//     setComment(event.target.value); // Обновляем состояние при изменении текста в поле ввода
//   };

//   const handleSubmit = async () => {
//     if (comment.trim() === '') return; // Проверка на пустой комментарий

//     try {
//       const response = await axiosSecure.post('/api/comments', { text: comment, userId });
//       setComments([...comments, response.data]); // Добавляем новый комментарий в список
//       setComment(''); // Очищаем поле ввода
//     } catch (error) {
//       console.error('Ошибка при отправке комментария:', error);
//     }
//   };

//   return (
//     <div className='text-black'>
//       <div className='text-start'>
//         <textarea
//           className='border border-orange-400'
//           id="comment"
//           value={comment}
//           onChange={handleCommentChange}
//           rows="4"
//           cols="50"
//           placeholder="Введите ваш комментарий..."
//         />
//         <button onClick={handleSubmit}><BiMailSend className='text-black' /></button>
//       </div>

//       <div>
//         <h3>Комментарии:</h3>
//         <ul>
//           {comments.map((comment, index) => (
//             <li key={index}>{comment.text}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

export default FeedbackUser;