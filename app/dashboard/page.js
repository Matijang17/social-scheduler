"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Fetch posts from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "scheduled_posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to add a new post
  const addPost = async (e) => {
    e.preventDefault();
    if (!newPost || !scheduledTime) {
      alert("Please enter a post and a scheduled time.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "scheduled_posts"), {
        post: newPost,
        scheduledTime: new Date(scheduledTime),
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);

      setPosts([...posts, { id: docRef.id, post: newPost, scheduledTime }]);
      setNewPost("");
      setScheduledTime("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Function to post to social media
  const postToSocial = async (postContent) => {
    const response = await fetch("/api/postToSocial", {
      method: "POST",
      body: JSON.stringify({ postContent }),
    });

    const data = await response.json();
    if (data.success) {
      alert("✅ Post published successfully!");
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  const statusChangeCallback = (response) => {
    console.log('Login status changed:', response);
    if (response.status === 'connected') {
      console.log('User logged in and authorized');
    }
  };

  const handleLoginClick = () => {
    if (window.FB) {
      FB.getLoginStatus(statusChangeCallback);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
        onClick={handleLoginClick}
        style={{ marginBottom: "20px" }}
      ></div>
      <div
        className="fb-like"
        data-share="true"
        data-width="450"
        data-show-faces="true"
        style={{ marginBottom: "20px" }}
      ></div>
      <h1>📅 Schedule a Post</h1>

      <form onSubmit={addPost} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter your post"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          required
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit">➕ Schedule Post</button>
      </form>

      <h2>📋 Scheduled Posts</h2>
      {posts.length === 0 ? (
        <p>No scheduled posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.post}</strong> <br />
              📅 {new Date(post.scheduledTime).toLocaleString()} <br />
              <button onClick={() => postToSocial(post.post)}>🚀 Post Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
