#!/usr/bin/env bash

#######################################################################
################### PROJECT SPECIFIC VARIABLES ########################
#######################################################################
################## change these on new project ########################
#######################################################################

# name of dockerhub repository
IMAGE_NAME=01people/wexo-nfc-market-gateway-typescript-node

# main dockerfile that project is built with
DOCKERFILE=./dockerfile.production

# add suffix to this array to build additional images
# these need to have their own dockerfile
# example: ./dockerfile-cron.production
SUFFIX_ADDITIONAL_IMAGES=(
    # cron
)

#######################################################################
################## DONT EDIT ANYTHING AFTER THIS ######################
#######################################################################

# colors
GREEN=$'\e[1;32m'
RED=$'\e[1;31m'
YELLOW=$'\e[1;33m'
BLUE=$'\e[1;34m'
END=$'\e[0m'

# checks if image with this version already exists on dockerhub
check_if_images_exist(){
    docker inspect $1:$2 &> /dev/null
    if [[ $? -eq 0 ]]; then
      printf "${RED}Image already exists${END}: ${BLUE}$1${END}:${YELLOW}$2${END}\nexiting..."
      exit 5
    fi
}

# builds image and push if build successful
build_and_push_image(){
    printf "${GREEN}Building docker image${END}: ${BLUE}$1${END}:${YELLOW}$2${END}\n"
    docker build -t $1:$2 -f $3 .
    [[ $? -eq 0 ]] \
      && printf "${GREEN}Image builded successfully${END}...${YELLOW}pushing to dockerhub${END}\n" \
      && docker push $1:$2
}

# checks if git changes tree clean (if anything uncommited exists)
if ! git diff-index --quiet HEAD --; then
      printf "${RED}ERROR: commit all your changes ${END}\nexiting..."
      exit 1
fi

# checks if tag specified
VERSION="$(git describe --tags --exact-match 2> /dev/null)"
if [[ -z "$VERSION" ]]
then
      printf "${RED}ERROR: Create actual tag in git ${END}\nexiting..."
      exit 2
fi

# checks if git tag exists on remote
GIT_TAG_IN_ORIGIN=$(git ls-remote --tags origin -l ${VERSION})
if [[ -z "$GIT_TAG_IN_ORIGIN" ]];
then
    printf "${RED}ERROR: Push tag:${YELLOW}$VERSION${END}${RED} to origin ${END}\nexiting..."
    exit 3
fi

# checks if main repository is not already used tag on dockerhub
check_if_images_exist $IMAGE_NAME $VERSION

# checks if additional dockerfiles exist and if they are not already used tag on dockerhub
for SUFFIX_ADDITIONAL_IMAGE in "${SUFFIX_ADDITIONAL_IMAGES[@]}"
do
    ADDITIONAL_DOCKERFILE=$(echo "$DOCKERFILE" | sed "s/\.\([^.]*\)$/-$SUFFIX_ADDITIONAL_IMAGE.\1/")
    [ ! -f $ADDITIONAL_DOCKERFILE ] \
    && printf "${RED}ERROR: Additional dockerfile: ${YELLOW}$ADDITIONAL_DOCKERFILE${END}${RED} does not exist${END}\nexiting..." \
    && exit 4
    check_if_images_exist "$IMAGE_NAME-$SUFFIX_ADDITIONAL_IMAGE" $VERSION
done

# builds main image
build_and_push_image $IMAGE_NAME $VERSION $DOCKERFILE
for SUFFIX_ADDITIONAL_IMAGE in "${SUFFIX_ADDITIONAL_IMAGES[@]}"
do
    # builds additional images
    ADDITIONAL_DOCKERFILE=$(echo "$DOCKERFILE" | sed "s/\.\([^.]*\)$/-$SUFFIX_ADDITIONAL_IMAGE.\1/")
    build_and_push_image "$IMAGE_NAME-$SUFFIX_ADDITIONAL_IMAGE" $VERSION "$ADDITIONAL_DOCKERFILE"
done
