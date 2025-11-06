{ config, pkgs, ... }:

{
  # Remember to run `sudo nixos-rebuild switch` after modifying this file.
  # To generate `hardware-configuration.nix`, run `sudo nixos-generate-config`.
  # This should be done first time you set up NixOS on a new machine.
  imports = [ ./hardware-configuration.nix ];

  boot.loader.grub.enable = false;
  boot.loader.generic-extlinux-compatible.enable = true;

  networking.hostName = "screen-X";

  # System packages
  environment.systemPackages = with pkgs; [
    chromium
    noto-fonts
    noto-fonts-emoji
    vim
    htop
  ];

  # Fonts
  fonts.packages = with pkgs; [
    noto-fonts
    noto-fonts-emoji
  ];

  # Eduroam WiFi with external password file
  #
  # For nixos to automatically connect, create a file in the secretsFile path with:
  #
  # ```
  # EDUROAM_USERNAME=<username>
  # EDUROAM_PASSWORD=<password>
  # ```
  networking.wireless = {
    enable = true;
    secretsFile = "/etc/nixos/secrets/wireless.env";
    networks.eduroam = {
      auth = ''
        key_mgmt=WPA-EAP
        eap=PEAP
        identity=ext:EDUROAM_USERNAME
        password=ext:EDUROAM_PASSWORD
        phase2="auth=MSCHAPV2"
      '';
    };
  };

  # Tailscale VPN
  services.tailscale.enable = true;

  # Enable SSH
  services.openssh = {
    enable = true;
    settings = {
      PasswordAuthentication = true;
      PermitRootLogin = "no";
    };
  };

  # Kiosk user
  #
  # The user is named `kiosk`, and does not have a password set by default.
  # You should set a password with `sudo passwd kiosk`.
  users.users.kiosk = {
    isNormalUser = true;
    extraGroups = [ "video" "audio" "wheel" ];
  };

  # X11 and auto-login
  services.xserver = {
    enable = true;

    displayManager = {
      lightdm = {
        enable = true;
        greeter.enable = false;
      };
    };

    windowManager.openbox.enable = true;
    desktopManager.session = [{
      name = "kiosk";
      start = ''
        ${pkgs.openbox}/bin/openbox &
        ${pkgs.chromium}/bin/chromium \
          --kiosk \
          --noerrdialogs \
          --disable-infobars \
          --no-first-run \
          --disable-session-crashed-bubble \
          --disable-features=TranslateUI \
          --check-for-update-interval=31536000 \
          "https://screen.echo-webkom.no" &
      '';
    }];
  };
  services.displayManager.autoLogin = {
    enable = true;
    user = "kiosk";
  };

  # Disable power management (keep screen on)
  powerManagement.enable = false;

  # Prevent screen blanking
  services.xserver.serverFlagsSection = ''
    Option "BlankTime" "0"
    Option "StandbyTime" "0"
    Option "SuspendTime" "0"
    Option "OffTime" "0"
  '';

  # Time zone
  time.timeZone = "Europe/Oslo";

  # Keyboard layout
  services.xserver.layout = "no";

  # Locale
  i18n.defaultLocale = "nb_NO.UTF-8";

  # State version, should match NixOS version
  system.stateVersion = "24.11";
}
