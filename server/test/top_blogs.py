# import requests
# from bs4 import BeautifulSoup

# # URL of the page to scrape
# url = 'https://finviz.com/news.ashx'

# # Send a get request to the URL
# response = requests.get(url)
# print('print:',response.content)

# # Check if the request was successful
# if response.status_code == 200:
#     # Parse the content of the page with BeautifulSoup
#     soup = BeautifulSoup(response.content, 'html.parser')
    
#     # Find the HTML element that contains the blogs, for example, a div with a specific class
#     # This selector would need to be updated with the correct path to the blog links
#     blogs_container = soup.find('div', class_='blog-posts')

#     # Find all the links within this container
#     # Again, 'a' and 'href' might need to be adjusted based on the website's structure
#     blog_links = blogs_container.find_all('a', href=True)

#     # Extract the top 20 links (or as many as available if less than 20)
#     top_blog_links = [link['href'] for link in blog_links[:20]]

#     # Print out the links
#     for link in top_blog_links:
#         print(link)
# else:
#     print('Failed to retrieve the webpage')
