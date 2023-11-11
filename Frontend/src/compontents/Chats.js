import React from "react";

const Chats = () => {
  return (
    <div>
      <div class="chats">
        <div class="chat">
          <div class="img-info">
            <img src="./images/jaime-marrero-QjTr0Nq8F04-unsplash.jpg" alt="" />
            <div class="txt">
              <h4>Arts are us</h4>
              <p style={{ color: "GrayText" }}>213 members</p>
            </div>
          </div>
          <div class="addIcon">✔️</div>
        </div>
        <div class="chat">
          <div class="img-info">
            <img
              src="./images/priscilla-du-preez-IEhdpoA9zrY-unsplash.jpg"
              alt=""
            />
            <div class="txt">
              <h4>Group name2</h4>
              <p style={{ color: "GrayText" }}>52 members</p>
            </div>
          </div>
          <div class="addIcon">➕</div>
        </div>
        <div class="chat">
          <div class="img-info">
            <img
              src="./images/kajetan-sumila-gsOy0c8HdHc-unsplash.jpg"
              alt=""
            />
            <div class="txt">
              <h4>Group name3</h4>
              <p style={{ color: "GrayText" }}>26 members</p>
            </div>
          </div>
          <div class="addIcon">➕</div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
