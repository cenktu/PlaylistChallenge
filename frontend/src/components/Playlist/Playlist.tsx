import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Content from '../Content/Content';
import "./Playlist.scss";

// Type for playlist items
interface PlaylistContentItem {
  name: string;
  url: string;
  duration: number;
  type: string;
}

function Playlist() {
  // State to store playlist content and the selected item in the carousel
  const [playlistContent, setPlaylistContent] = useState<PlaylistContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  useEffect(() => {
    fetchPlaylistContent();
  }, []);

  const fetchPlaylistContent = () => {
    // API request to fetch playlist items
    Axios.get<PlaylistContentItem[]>('/api/playlist')
      .then((response) => {
        setPlaylistContent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const addItemToPlaylist = (newItem: PlaylistContentItem) => {
    // Post request to add newItem to the playlist content
    Axios.post('/api/add', newItem)
      .then((response) => {
        console.log('Item added:', response.data);
        // Fetch the updated playlist content.
        fetchPlaylistContent();
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  useEffect(() => {
    // Setting a timer to move to the next item in carousel
    if (playlistContent.length > 0) {
      let currentIndex = 0;
      let timeoutId: NodeJS.Timeout;

      const transitionToNextItem = () => {
        currentIndex = (currentIndex + 1) % playlistContent.length;
        setSelectedItem(currentIndex);

        // Calculate the duration for the current item
        const currentDuration = playlistContent[currentIndex].duration * 1000;
        // Set a timeout to move to the next item after current item's duration
        timeoutId = setTimeout(transitionToNextItem, currentDuration);
      };

      // Start the carousel slide animation
      timeoutId = setTimeout(transitionToNextItem, playlistContent[currentIndex].duration * 1000);

      // Clear the timer
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [playlistContent]);

  return (
    
    <div className="carousel-app">
        <Content onAddItem={addItemToPlaylist} />
      <div className="carousel-container">
        <Carousel selectedItem={selectedItem} showArrows={true} showThumbs={false} showIndicators={false}>
          {playlistContent.map((item) => (
            <div className="content-item" key={item.name}>
              {item.type === 'image' ? (
                <img src={item.url} alt={item.name} />
              ) : item.type === 'video' ? (
                <video controls autoPlay muted loop>
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : null}
            </div>
          ))}
        </Carousel>

      </div>
    </div>
  );
}

export default Playlist;