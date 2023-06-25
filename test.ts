// Display the HTML page
figma.showUI(__html__, { width: 400, height: 600});
// Set Color Schemes
const colors = {
  primaryText: { 
    r: 0,
    g: 0, 
    b: 0 
  },
  primaryBackground: {
    r: 1, 
    g: 1, 
    b: 1 
  },
  secondaryText: {
    r: 0.5, 
    g: 0.5, 
    b: 0.5 
  },
  twitterPlatform: {
    r: 0.1, 
    g: 0.6, 
    b: 0.9
  }
}
figma.ui.onmessage = async (msg) => {
  // based on user selection perform frame creation
  if (msg.type === 'insert-default') {
    const tweetFrame = figma.createFrame()
    tweetFrame.resize(395, 206)
    tweetFrame.fills = [{ type: 'SOLID', color: colors.primaryBackground }]
    tweetFrame.cornerRadius = 5
    tweetFrame.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        blendMode: 'NORMAL',
        offset: { x: 0, y: 20 },
        radius: 60,
        visible: true,
      }
    ]
    tweetFrame.name = 'Tweet'
    try {
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
      await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
      await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })
      const dynamicData = await fetch('https://api.quotable.io/quotes/random?minLength=95&maxLength=110');
      const image = await figma.createImageAsync('https://picsum.photos/200')
      const iconUrl = 'https://raw.githubusercontent.com/sharan3102/figma-plugin/main/VerifiedIcon.png'
      const icon = await figma.createImageAsync(iconUrl)
      
      const data = await dynamicData.json();
      const quote = data[0].content;
      const author = data[0].author;
      const auth = author.split(" ")
      
      // Use the quote and author data in your plugin
      
      // Create Profile picture
      const profilePicture = figma.createEllipse()
      profilePicture.resize(52, 52)
      profilePicture.name = 'Profile Picture'
      profilePicture.fills = [
        {
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FILL',
        },
      ];

      // Create Icon
      const verifiedIcon = figma.createEllipse()
      verifiedIcon.resize(14,14)
      verifiedIcon.name = 'Verified Icon'
      verifiedIcon.fills = [{
        type: 'IMAGE',
        imageHash: icon.hash,
        scaleMode: 'FILL'
      }]     


      const displayName = figma.createText()
      displayName.characters = author || "Mark Spencer"
      displayName.fontSize = 14
      displayName.fontName = { family: 'Inter', style: 'Bold' }
      displayName.fills = [{ type: 'SOLID', color: colors.primaryText }]

      const userName = figma.createText()
      userName.characters = `@${auth[0]}`|| "@markwrites"
      userName.fontSize = 12
      userName.fontName = { family: 'Inter', style: 'Regular' }
      userName.fills = [{ type: 'SOLID', color: colors.secondaryText }]
      
      const tweetMessage = figma.createText()
      tweetMessage.characters = quote ||"Why did the computer go to the doctor? Because it had a virus and couldn't stop coughing up SPAM emails! 🤧💌😄"
      tweetMessage.fontSize = 16
      tweetMessage.fontName = { family: 'Inter', style: 'Regular' }
      tweetMessage.fills = [{ type: 'SOLID', color: colors.primaryText }]
      tweetMessage.resize(350,tweetMessage.height)
      tweetMessage.textAutoResize = 'HEIGHT'
      
      const symbol = figma.createText()
      symbol.characters = '·'
      symbol.fontSize = 11.5
      symbol.fontName = { family: 'Inter', style: 'Medium' }
      symbol.fills = [{ type: 'SOLID', color: colors.secondaryText }]

      const platform = figma.createText()
      platform.characters = 'Twitter Web App'
      platform.fontSize = 11.5
      platform.fontName = { family: 'Inter', style: 'Medium' }
      platform.fills = [{ type: 'SOLID', color: colors.twitterPlatform }]

      const timeStamp = figma.createText()
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes()
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const month = monthNames[currentDate.getMonth()]
      const day = currentDate.getDate()
      const year = currentDate.getFullYear()

      const formattedDate = `${formattedHours}:${formattedMinutes} ${amOrPm} · ${month} ${day}, ${year}`
      console.log(formattedDate)

      timeStamp.characters = formattedDate
      timeStamp.fontSize = 11.5
      timeStamp.fontName = { family: 'Inter', style: 'Medium' };
      timeStamp.fills = [{ type: 'SOLID', color: colors.secondaryText }]



      const displayNameAndIconFrame = figma.createFrame()
      displayNameAndIconFrame.layoutMode = 'HORIZONTAL'
      displayNameAndIconFrame.counterAxisSizingMode = 'AUTO'
      displayNameAndIconFrame.itemSpacing = 6
      displayNameAndIconFrame.fills = []
      displayNameAndIconFrame.appendChild(displayName)
      displayNameAndIconFrame.appendChild(verifiedIcon)
      displayNameAndIconFrame.counterAxisAlignItems = 'CENTER'
      displayNameAndIconFrame.primaryAxisAlignItems = 'CENTER'
      displayNameAndIconFrame.name = 'UserInfo'
      
      const profileText = figma.createFrame()
      profileText.layoutMode = 'VERTICAL'
      profileText.counterAxisSizingMode = 'AUTO'
      profileText.itemSpacing = 2
      profileText.fills = []
      profileText.appendChild(displayNameAndIconFrame)
      profileText.appendChild(userName)
      profileText.counterAxisAlignItems = 'MIN'
      profileText.primaryAxisAlignItems = 'MIN'
      profileText.name = 'Profile Details'

      const profile = figma.createFrame()
      profile.layoutMode = 'HORIZONTAL'
      profile.counterAxisSizingMode = 'AUTO'
      profile.itemSpacing = 8
      profile.fills = []
      profile.appendChild(profilePicture)
      profile.appendChild(profileText)
      profile.counterAxisAlignItems = 'CENTER'
      profile.primaryAxisAlignItems = 'CENTER'
      profile.name = 'Profile'

      const tweetTop = figma.createFrame()
      tweetTop.layoutMode = 'VERTICAL'
      tweetTop.counterAxisSizingMode = 'AUTO'
      tweetTop.itemSpacing = 14
      tweetTop.fills = []
      tweetTop.appendChild(profile)
      tweetTop.appendChild(tweetMessage)
      tweetTop.counterAxisAlignItems = 'MIN'
      tweetTop.primaryAxisAlignItems = 'MIN'
      tweetTop.name = 'Tweet Content'
      
      const tweetBottom = figma.createFrame()
      tweetBottom.layoutMode = 'HORIZONTAL'
      tweetBottom.counterAxisSizingMode = 'AUTO'
      tweetBottom.itemSpacing = 4
      tweetBottom.fills = []
      tweetBottom.appendChild(timeStamp)
      tweetBottom.appendChild(symbol)
      tweetBottom.appendChild(platform)
      tweetBottom.counterAxisAlignItems = 'MIN'
      tweetBottom.primaryAxisAlignItems = 'MIN'
      tweetBottom.name = 'Tweet Info ℹ️'

      const tweet = figma.createFrame()
      tweet.layoutMode = 'VERTICAL'
      tweet.counterAxisSizingMode = 'AUTO'
      tweet.itemSpacing = 20
      tweet.fills = []
      tweet.appendChild(tweetTop)
      tweet.appendChild(tweetBottom)
      tweet.counterAxisAlignItems = 'MIN'
      tweet.primaryAxisAlignItems = 'MIN'
      tweet.name = 'Tweet'
      tweet.x+=20
      tweet.y+=20

      
      tweetFrame.appendChild(tweet)
      
      const selected = figma.currentPage.selection;

      if(selected.length >= 1){
        console.log(selected[0].width)
        tweetFrame.x = selected[0].x + selected[0].width + 50
        tweetFrame.y = selected[0].y 
      }

      figma.currentPage.appendChild(tweetFrame);
    } catch (error) {
      console.log(error);
    }
    
  }

  // close the plugin
  figma.closePlugin();
};
