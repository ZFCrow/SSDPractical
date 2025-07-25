FROM node:alpine

# Install dependencies and git-http-server globally
RUN apk add --no-cache tini git openssh && \
    yarn global add git-http-server && \
    adduser -D -g git git

# Use root so we can set up SSH and permissions
USER root

# Working directory for Git and SSH
WORKDIR /home/git

# Copy the startup script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# SSH daemon config (done while still root)
RUN ssh-keygen -A
# RUN ssh-keygen -A && \
#     echo "PasswordAuthentication no" >> /etc/ssh/sshd_config && \
#     echo "PermitRootLogin no" >> /etc/ssh/sshd_config && \
#     echo "AllowUsers git" >> /etc/ssh/sshd_config && \
#     echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config && \
#     echo "KbdInteractiveAuthentication no" >> /etc/ssh/sshd_config && \
#     echo "X11Forwarding no" >> /etc/ssh/sshd_config && \
#     echo "AllowTcpForwarding no" >> /etc/ssh/sshd_config



# # Switch to git user for runtime
# USER git
# Entrypoint: handles SSH key setup and launching services

USER root
ENTRYPOINT ["/entrypoint.sh"]


# USER git
# WORKDIR /home/git
# RUN git init --bare repository.git
# ENTRYPOINT ["tini", "--", "git-http-server", "-p", "3000", "/home/git"]
